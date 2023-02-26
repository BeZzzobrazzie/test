class TextField {
  constructor(domElement) {
    this.domElement = domElement;
    this.initEventListener(this.domElement);
    console.log('init textField');
  }

  initEventListener(domElement) {
    domElement.addEventListener('focusin', this);
    domElement.addEventListener('focusout', this);
  }


  handleEvent(event) {
    switch(event.type) {
      case 'focusin':
        if(event.target.value == event.target.getAttribute('value')) {
          event.target.value = '';
        }
        break;
      case 'focusout':
        if(event.target.value == '') {
          event.target.value = event.target.getAttribute('value');
        }
        break;
    }
  }
  
}

export {TextField}