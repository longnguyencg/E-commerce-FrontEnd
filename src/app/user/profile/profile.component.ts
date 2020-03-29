import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm;
  changePassForm;
  user;
  detailsUser;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router,
              private usersService: UserService) {
  }

  ngOnInit(): void {
    this.usersService.cast.subscribe(user => {
      this.user = user;
      this.usersService.getDetails(this.user.id).subscribe(data => {
        if (data) {
          this.detailsUser = data;
          this.profileForm = this.fb.group({
            phone: [this.detailsUser.phone, [Validators.required]],
            address: [this.detailsUser.address, [Validators.required]],
            addressOther: [this.detailsUser.addressOther, [Validators.required]],
            avatar: [this.detailsUser.avatar, [Validators.required]],
          });
        } else {
          this.profileForm = this.fb.group({
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            addressOther: ['', [Validators.required]],
            avatar: ['', [Validators.required]],
          });
        }
      });
      this.changePassForm = this.fb.group({
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmNewPassword: ['', [Validators.required]],
      });
    });
  }

  editProfile(data1) {
    const details = {
      user_id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      phone: data1.phone,
      address: data1.address,
      addressOther: data1.addressOther,
      avatar: data1.avatar
    };
    if (this.detailsUser) {
      this.usersService.updateDetails(details).subscribe(next => {
        alert('Updated');
        this.usersService.getDetails(this.user.id).subscribe(data => {
          this.detailsUser = '';
          this.detailsUser = data;
          this.profileForm = this.fb.group({
            phone: [this.detailsUser.phone, [Validators.required]],
            address: [this.detailsUser.address, [Validators.required]],
            addressOther: [this.detailsUser.addressOther, [Validators.required]],
            avatar: [this.detailsUser.avatar, [Validators.required]],
          });
        });
      });
    } else {
      this.usersService.newDetails(details).subscribe(next => {
        alert('Added');
        this.usersService.getDetails(this.user.id).subscribe(data => {
            this.detailsUser = data;
            this.profileForm = this.fb.group({
              phone: [this.detailsUser.phone, [Validators.required]],
              address: [this.detailsUser.address, [Validators.required]],
              addressOther: [this.detailsUser.addressOther, [Validators.required]],
              avatar: [this.detailsUser.avatar, [Validators.required]],
            });
        });
      });
    }
  }
  changePass(data) {
    if (data.oldPassword && data.newPassword && data.confirmNewPassword) {
      if (data.newPassword === data.confirmNewPassword) {
        const cPUser = {
          id: this.user.id,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        };
        this.usersService.changePass(cPUser).subscribe(next1 => {
            if (next1 === 'Successfully') {
              alert('Change password successfully');
              this.changePassForm = this.fb.group({
                oldPassword: ['', [Validators.required]],
                newPassword: ['', [Validators.required]],
                confirmNewPassword: ['', [Validators.required]],
              });
            } else {
              alert('Change password failed');
            }
          }
        );
      }
    }
  }
}
