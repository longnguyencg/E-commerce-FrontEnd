import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }

  login(data) {
    const user = {
      email: data.email,
      password: data.password,
    };
    this.userService.login(user).subscribe(next => {
      if (next.message === 'success') {
        this.router.navigate(['/home']);
      } else { alert('Sai thông tin đăng nhập'); }
    });
  }

}
