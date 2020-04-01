class CxtFooter extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this._poweredby = "";
        this._rights = "";
    }

    get poweredby(){
        return this._poweredby;
    }

    get rights(){
        return this._rights;
    }

    set poweredby(val){
        this.setAttribute('poweredby', val);
    }
   
    set rights(val){
        this.setAttribute('rights', val);
    }

    static get observedAttributes(){
        return ['poweredby', 'rights'];
    }

    attributeChangedCallback(attrName, oldVal, newVal){
        
        switch(attrName){
            case 'poweredby':
                var leftdiv1 = this.shadow.querySelector(".leftdiv");
                this._poweredby = newVal; 
                if(leftdiv1){
                    leftdiv1.innerHTML = this.poweredby || "";
                }
               // console.log(this.poweredby);

            case 'rights':
                var rightdiv1 = this.shadow.querySelector(".rightdiv");
                this._rights = newVal;
                if(rightdiv1){
                    rightdiv1.innerHTML = this.rights || "";
                }
        }
    } 

    connectedCallback(){
        var template = `
        <style>
        .flex-container {
            width:100%;
            position:absolute;
            display: flex;
            flex-wrap: wrap;
            background-color: #2B2D42;
            justify-content: center;
            bottom:0;
          }
          
          .flex-container > div {         
            width: 45%;  
            color:#ffffff;   
            padding:10px 
          }

          .leftdiv{
              text-align:left;
          }

          .rightdiv{
              text-align:right
          }

        </style>
        <footer class="flex-container">
            <div class="leftdiv">${this.poweredby}</div>
            <div class="rightdiv">${this.rights}</div>
        </footer>`;

        this.shadow.innerHTML = template;
    }
}


class CxtProgressBar extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this._complete = 0;
    }

    get complete(){
        return this._complete;
    }

    set complete(val){
        this.setAttribute('complete', val);
    }

    static get observedAttributes(){
        return ['complete'];
    }

    attributeChangedCallback(attrName, oldVal, newVal){
        var innerbar = this.shadow.querySelector(".progress-bar-inner");
        switch(attrName){
            case 'complete':
                this._complete = parseInt(newVal, 10) || 0;
                if(innerbar){
                   innerbar.style.width = this.complete + '%';
                   innerbar.innerHTML = this.complete + '%';                 
                }
                console.log(this.complete);
        }
    }

    connectedCallback(){
        var template = `
        <style>
            .progress-bar{
                height:20px;
                width:100%;
                background-color:#EDF2F4;
                border-radius:5px;
                color:#fff;
            }

            .progress-bar-inner{
                height:100%;
                line-height:20px;
                background-color:#2B2D42;
                text-align:center;
                width: ${this.complete}%;
            }
        </style>
        <div class="progress-bar">
            <div class="progress-bar-inner">${this.complete}%</div>
        </div>`;

        this.shadow.innerHTML = template;
    }
} 

class CxtHeader extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this._companyname = "";
    }

    get companyname(){
        return this._companyname;
    }

    set companyname(val){
        this.setAttribute('companyname', val)
    }

    static get observedAttributes(){
        return ['companyname'];
    }

    attributeChangedCallback(attrName, oldVal, newVal){
        var innerbar = this.shadow.querySelector(".logo");
        switch(attrName){
            case 'companyname':
                this._companyname = newVal;
                if(innerbar){             
                   innerbar.innerHTML = this.companyname;                 
                }
                
        }
    }

    connectedCallback(){
        var template = `
        <style>
        * {box-sizing: border-box;}
          
        .header {
          overflow: hidden;                
          padding: 20px 10px;
          border-bottom:2px solid gray;
        }
        
        .header a {
          float: left;
          color: black;
          text-align: center;
          padding: 12px;
          text-decoration: none;
          font-size: 18px; 
          line-height: 25px;
          border-radius: 4px;
        }
        
        .header a.logo {
          font-size: 25px;
          font-weight: bold;
        }
        
        .header a:hover {
          background-color: #ddd;
          color: black;
        }
        
        .header a.active {
          background-color: dodgerblue;
          color: white;
        }
        
        .header-right {
          float: right;
        }
        
        @media screen and (max-width: 500px) {
            .header a {
              float: none;
              display: block;
              text-align: left;
            }
            
            .header-right {
              float: none;
            }
          }
        </style>
           <div class="header">
            <a href="#default" class="logo">${this.companyname}</a>
            <div class="header-right">
                <a class="active" href="#home">Home</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>
           </div>
        `;

        this.shadow.innerHTML = template;
    }
}

class cxtcustomComponent extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode:'open'});
        this._styles = "";
    }

    get styles(){
        return this._styles;
    }

    set styles(mystyle){
        this._styles = mystyle;
    }

    static get observedAttributes(){
        return ['styles'];
    }

    attributeChangedCallback(attrName, oldVal, newVal){
        switch(attrName){
            case 'styles':
                this._styles = newVal;                               
        }
    }
  
    connectedCallback(){
        var template = `
           <div>
             <slot></slot>
           </div>
        `;
        this.shadow.innerHTML = template;
    }

}

window.customElements.define('cxt-component', cxtcustomComponent);
window.customElements.define('cxt-header', CxtHeader);
window.customElements.define('cxt-progress-bar', CxtProgressBar);
window.customElements.define('cxt-footer', CxtFooter);