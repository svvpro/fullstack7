import {ElementRef} from "@angular/core";

export interface ModalInstance {
  open?();
  close?();
  destroy?();
}

declare var M;

export class MaterialService {

  static toast(message: string) {
    M.toast({html: message});
  }

  static updateTextFields() {
    M.updateTextFields();
  }

  static iniModal(ref: ElementRef): ModalInstance {
    return M.Modal.init(ref.nativeElement);
  }

}
