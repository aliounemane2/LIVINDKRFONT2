import {ToastOptions} from 'ng2-toastr';


export class CustomOption extends ToastOptions {
    animate = 'flyLeft'; // you can override any options available
    newestOnTop = false;
    showCloseButton = true;
    dismiss = 'click';
    positionClass = 'toast-top-right';
    maxShown = 1;
  }