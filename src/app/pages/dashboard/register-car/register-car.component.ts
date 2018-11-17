import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.scss']
})
export class RegisterCarComponent implements OnInit {

  form: FormGroup;
  selectedImage: any;
  isRegister: boolean;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
  ) {
    this.form = fb.group({
      'type': [ '' ],
      'name': [ '' ],
      'model': [ '' ],
      'number': [ '' ],
    })
  }

  ngOnInit() {
    this.isRegister = false;
  }

  registerCar() {
    this.isRegister = !this.isRegister;
  }

  photo(event: Event) {
    const file = event.target['files'][0];
    console.log(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result;
      console.log(this.selectedImage);
    }
  }

}
