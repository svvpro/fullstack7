import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../shared/services/category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {MaterialService} from "../../shared/classes/materialize.service";
import {Category} from "../../shared/interfaces";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @ViewChild('input') inputref: ElementRef;

  form: FormGroup;
  isNew: boolean = true;
  image: File;
  imagePreview: string = '';
  category: Category;

  constructor(private cs: CategoryService, private ar: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    this.form.disable();

    this.ar.params.pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          this.isNew = false;
          return this.cs.getCategoryById(params['id']);
        }
        return of(null);
      })
    ).subscribe((category) => {
      if (category) {
        this.category = category;
        this.form.patchValue({
          name: category.name
        });
        this.imagePreview = category.imageSrc;
        MaterialService.updateTextFields();
      }
      this.form.enable();
    }, error => {
      MaterialService.toast(error.error.message);
    });
  }

  submit(): void {
    let obs$;
    this.form.disable();

    if (this.isNew) {
      obs$ = this.cs.addCategory(this.form.value.name, this.image);
    } else {
      obs$ = this.cs.updateCategory(this.category._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
      category => {
        this.category = category;
        MaterialService.toast('Изменения сохранены');
      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }

  categoryDelete(): void {
    const confirm = window.confirm('Вы уверены что хотите удалить категорию?');
    if (confirm) {
      this.cs.deleteCategory(this.category._id).subscribe(
        response => MaterialService.toast(response.message),
        error => MaterialService.toast(error.error.message),
        () => this.router.navigate(['/categories'])
        );
    }
  }

  showLoadForm(): void {
    this.inputref.nativeElement.click();
  }

  onFileUploaded(event: any): void {
    this.image = event.target.files[0];

    //Стандартный класс JS
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(this.image);
  }

}
