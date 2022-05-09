import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadCrumbService } from '../bread-crumb/bread-crumb.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
    });

    BreadCrumbService.publishBase('Todo List');
    BreadCrumbService.publishComponent('Novo');
  }

  public fieldHasError(field: string, error: string): boolean {
    const f = this.form.get(field);
    return f?.getError(error) && f.touched;
  }

  public fieldDontHasAnyError(field: string): boolean {
    const f = this.form.get(field);
    return !(f?.errors);
  }

  public getFieldError(field: string, error: string): string {
    const f = this.form.get(field);
    const e = f?.getError(error);
    
    if (e && error === 'required') {
      return 'O campo é obrigatório';
    }

    if (e && error === 'minlength') {
      return `O comprimento mínimo é de ${e.requiredLength} carácteres.`;
    }

    console.log(e);

    return '';
  }
}
