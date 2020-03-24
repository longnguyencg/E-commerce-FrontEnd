import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [],
      email: [],
      password: [],
    });
  }

  register(data) {
    if (data.name && data.email && data.password) {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      this.userService.register(user).subscribe(next => {
        this.router.navigate(['']);
      });
    } else {
      alert('Error');
    }
  }

  findById() {
    this.userService.findById(1).subscribe(next => {
      console.log(next);
    });
  }

  cancel() {
    this.router.navigate(['login']);
  }
}
