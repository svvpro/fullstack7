import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionService} from "../../../shared/services/position.service";
import {MaterialService, ModalInstance} from "../../../shared/classes/materialize.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Position} from "../../../shared/interfaces";

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css']
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal') modalRef: ElementRef;
  @Input('categoryId') categoryId: string;
  modal: ModalInstance;
  positions: Position[];
  positionId: string = null;
  form: FormGroup;

  constructor(private ps: PositionService) {
  }

  ngOnInit() {
    this.ps.getAllPositions(this.categoryId).subscribe(
      (positions) => this.positions = positions,
      error => MaterialService.toast(error.error.message)
    );
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      coast: new FormControl(0, [Validators.required])
    });

  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.iniModal(this.modalRef);
  }

  onCreatePosition(): void {
    this.modal.open();
    this.form.reset({
      name: null,
      coast: 0
    });
    MaterialService.updateTextFields();
  }

  onUpdatePosition(position: Position): void {
    this.positionId = position._id;
    this.modal.open();
    this.form.patchValue({
      name: position.name,
      coast: position.coast
    });
    MaterialService.updateTextFields();
  }


  onDeletePosition(position: Position): void {
    this.ps.deletePosition(position).subscribe(
      (request) => {
        MaterialService.toast(request.message);
        const pos = this.positions.findIndex(p => p._id === position._id );
        this.positions.splice(pos, 1);
      },
      error => MaterialService.toast(error.error.message);
    );
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  submit(): void {
    this.form.disable();

    const newPosition: Position = {
      name: this.form.value.name,
      coast: this.form.value.coast,
      category: this.categoryId
    };

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.ps.updatePosition(newPosition).subscribe(
        (position: Position) => {
          MaterialService.toast('Позиция успешно добавлена');
          const pos = this.positions.findIndex(p => p._id === position._id);
          this.positions[pos] = position;
        },
        (error) => MaterialService.toast(error.error.message),
        () => {
          this.form.enable();
          this.form.reset({
            name: '',
            coast: 0
          });
          this.modal.close();
        }
      );
    } else {
      this.ps.addPosition(newPosition).subscribe(
        (position: Position) => {
          MaterialService.toast('Позиция успешно добавлена');
          this.positions.push(position);
        },
        (error) => MaterialService.toast(error.error.message),
        () => {
          this.form.enable();
          this.form.reset({
            name: '',
            coast: 0
          });
          this.modal.close();
        }
      );
    }
  }

}
