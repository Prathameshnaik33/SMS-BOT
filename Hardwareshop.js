const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    Product:   Symbol("Product"),
    Type:   Symbol("Type"),
    EXTRAS:  Symbol("extras")
});

module.exports = class LockDownEssentials extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sSpecies = "";
        this.sProduct = "";
        this.sType = "";
        this.sExtras = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.Product;
                aReturn.push("Welcome to Naik's Hardware Store.");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                if(sInput.toLowerCase() == "clean"){
                  this.sSpecies = "cleaning";
                }else if(sInput.toLowerCase() == "electronic") {
                  this.sSpecies = "elctronics";
                } else {
                  this.stateCur = OrderState.WELCOMING;
                  aReturn.push("Please type CLEAN if you want cleaning product or ELECTRONIC if you have a electronic.");
                  break;
                }
                aReturn.push("Would you like eco-friendly or normal product or NO");
                break;
            case OrderState.Product:
                if(this.sSpecies == "cleaning"){
                  this.stateCur = OrderState.Type;
                  aReturn.push("would you like to buy a special brooms");
                }else{
                  this.stateCur = OrderState.EXTRAS;
                  aReturn.push("Would you like to buy CAR CLOTH or EAR BUDS with it?");
                }
                if(sInput.toLowerCase()!= "no"){
                  this.sProduct = sInput;
                }
                break;
            case OrderState.Type:
                this.stateCur = OrderState.EXTRAS
                if(sInput.toLowerCase()!= "no"){
                  this.sType = "advance fiber broom";
                }
                aReturn.push("Would you like to buy CAR CLOTH or EAR BUDS with it?");
                break;
            case OrderState.EXTRAS:
                if(sInput.toLowerCase() != "no"){
                    this.sExtras = sInput;
                }
                aReturn.push("Thank-you for your order of");
                this.nTotal = 0;
                if(this.sSpecies == "cleaning" && this.sProduct.toLowerCase() == "eco-friendly"){
                  aReturn.push("Eco-friendly Dustbin");
                  this.nTotal += 5.99;
                }else if(this.sSpecies == "cleaning" && this.sProduct.toLowerCase() == "normal"){
                  aReturn.push("normal dustbin");
                  this.nTotal += 5.99
                }else if(this.sSpecies == "electronics" && this.sProduct.toLowerCase() == "eco-friendly"){
                  aReturn.push("eco-friendly light bulb");
                  this.nTotal += 2.99;
                }else if(this.sSpecies == "electronics" && this.sProduct.toLowerCase() == "normal"){
                  aReturn.push("normal light bulb");
                  this.nTotal += 2.99
                }
                if(this.sType){
                  aReturn.push(this.sType);
                  this.nTotal += 2.99;
                }
                if(this.sExtras){
                  aReturn.push(this.sExtras);
                  this.nTotal += 2.99;
                }
                aReturn.push(`Your total comes to ${this.nTotal}`);
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      return(`
      <html>

      <head>
          <meta content="text/html; charset=UTF-8" http-equiv="content-type">
          <style type="text/css">
              ol {
                  margin: 0;
                  padding: 0
              }
      
              table td,
              table th {
                  padding: 0
              }
      
              .c0 {
                  border-right-style: solid;
                  padding: 5pt 5pt 5pt 5pt;
                  border-bottom-color: #000000;
                  border-top-width: 1pt;
                  border-right-width: 1pt;
                  border-left-color: #000000;
                  vertical-align: top;
                  border-right-color: #000000;
                  border-left-width: 1pt;
                  border-top-style: solid;
                  border-left-style: solid;
                  border-bottom-width: 1pt;
                  width: 225pt;
                  border-top-color: #000000;
                  border-bottom-style: solid
              }
      
              .c12 {
                  border-right-style: solid;
                  padding: 5pt 5pt 5pt 5pt;
                  border-bottom-color: #000000;
                  border-top-width: 1pt;
                  border-right-width: 1pt;
                  border-left-color: #000000;
                  vertical-align: top;
                  border-right-color: #000000;
                  border-left-width: 1pt;
                  border-top-style: solid;
                  border-left-style: solid;
                  border-bottom-width: 1pt;
                  width: 218.2pt;
                  border-top-color: #000000;
                  border-bottom-style: solid
              }
      
              .c2 {
                  padding-top: 0pt;
                  border-top-width: 0pt;
                  padding-bottom: 7pt;
                  line-height: 1.15;
                  border-top-style: solid;
                  border-bottom-width: 0pt;
                  border-bottom-style: solid;
                  orphans: 2;
                  widows: 2;
                  text-align: right
              }
      
              .c6 {
                  padding-top: 0pt;
                  border-top-width: 0pt;
                  padding-bottom: 7pt;
                  line-height: 1.15;
                  border-top-style: solid;
                  border-bottom-width: 0pt;
                  border-bottom-style: solid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c5 {
                  padding-top: 0pt;
                  border-top-width: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  border-top-style: solid;
                  border-bottom-width: 0pt;
                  border-bottom-style: solid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c11 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 26pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c15 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 32pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c14 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 33pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c8 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 11pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c1 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: left;
                  height: 11pt
              }
      
              .c13 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 36pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c9 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 25pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c18 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c16 {
                  border-spacing: 0;
                  border-collapse: collapse;
                  margin-right: auto
              }
      
              .c3 {
                  background-color: #ffffff;
                  font-size: 20.5pt;
                  color: #494c4e
              }
      
              .c7 {
                  font-size: 21.5pt;
                  color: #494c4e
              }
      
              .c17 {
                  max-width: 468pt;
                  padding: 72pt 72pt 72pt 72pt
              }
      
              .c4 {
                  background-color: #ffffff
              }
      
              .c19 {
                  font-size: 22pt
              }
      
              .c10 {
                  height: 88.5pt
              }
      
              .title {
                  padding-top: 0pt;
                  color: #000000;
                  font-size: 26pt;
                  padding-bottom: 3pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .subtitle {
                  padding-top: 0pt;
                  color: #666666;
                  font-size: 15pt;
                  padding-bottom: 16pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              li {
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              p {
                  margin: 0;
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              h1 {
                  padding-top: 20pt;
                  color: #000000;
                  font-size: 20pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h2 {
                  padding-top: 18pt;
                  color: #000000;
                  font-size: 16pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h3 {
                  padding-top: 16pt;
                  color: #434343;
                  font-size: 14pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h4 {
                  padding-top: 14pt;
                  color: #666666;
                  font-size: 12pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h5 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h6 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  font-style: italic;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
          </style>
      </head>
      
      <body class="c4 c17">
          <p class="c18"><span class="c9">For Curbside Pickup:</span></p>
          <p class="c1"><span class="c8"></span></p>
          <p class="c18"><span class="c4 c19">Text &ldquo;Clean&rdquo; or &ldquo;Electronic&rdquo; to </span><span
                  class="c15 c4">519-111-1111</span></p>
          <p class="c1"><span class="c13 c4"></span></p>
          <p class="c1"><span class="c13 c4"></span></p><a id="t.2086b897bf9350a59c60824f13fab4eebf63db83"></a><a
              id="t.0"></a>
          <table class="c16">
              <tbody>
                  <tr class="c10">
                      <td class="c12" colspan="1" rowspan="1">
                          <p class="c6"><span class="c4 c7">Dustbins</span></p>
                          <p class="c5"><span class="c8 c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
                          </p>
                      </td>
                      <td class="c0" colspan="1" rowspan="1">
                          <p class="c2"><span class="c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  &nbsp; &nbsp; </span><span class="c11 c4">5.99</span></p>
                          <p class="c5"><span class="c8 c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
                          </p>
                      </td>
                  </tr>
                  <tr class="c10">
                      <td class="c12" colspan="1" rowspan="1">
                          <p class="c6"><span class="c3">Light Bulbs</span></p>
                          <p class="c5"><span class="c8 c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
                          </p>
                      </td>
                      <td class="c0" colspan="1" rowspan="1">
                          <p class="c2"><span class="c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  &nbsp; &nbsp; </span><span class="c4 c11">2.99</span></p>
                          <p class="c5"><span class="c8 c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
                          </p>
                      </td>
                  </tr>
                  <tr class="c10">
                      <td class="c12" colspan="1" rowspan="1">
                          <p class="c6"><span class="c3">Special Broom</span></p>
                          <p class="c5"><span class="c8 c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
                          </p>
                      </td>
                      <td class="c0" colspan="1" rowspan="1">
                          <p class="c2"><span class="c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  &nbsp; &nbsp; </span><span class="c11 c4">2.99</span></p>
                          <p class="c5"><span class="c8 c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
                          </p>
                          <p class="c1"><span class="c4 c8"></span></p>
                      </td>
                  </tr>
              </tbody>
          </table>
          <p class="c1"><span class="c4 c13"></span></p>
      </body>
      
      </html>     `);
  
    }
}
