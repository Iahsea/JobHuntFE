import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
// import setToken

@Component({
	selector: 'app-authenticate.component',
	imports: [],
	templateUrl: './authenticate.component.html',
	styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
		
	}

	ngOnInit(): void {

		const authCodeRegex = /access_token=([^&]+)/;
		const isMatch = window.location.href.match(authCodeRegex);
		let isLoginGoogle = false;

		if (isMatch) {
			const authCode = isMatch[1];
			console.log('Access Token from URL:', authCode);
			localStorage.setItem('token', authCode);
			isLoginGoogle = true;
			this.getUserGoogleDetails(authCode);

			// this.authService.changeCodeToToken(authCode).subscribe(
			//   (response) => {
			//     console.log('Token received:', response.token);
			//     localStorage.setItem('access_Token', response.token);
			//     isLoginGoogle = true;
			//     if (isLoginGoogle) {
			//       this.router.navigate(['/']);
			//     }
			//   },
			//   (error) => {
			//     console.error('Error exchanging code for token', error);
			//   }
			// );
		}
	}

	getUserGoogleDetails(accessToken: string | null) {
		if (!accessToken) {
			return;
		}
		this.http
			.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
			.subscribe((data) => {
				localStorage.setItem("userGoogle", JSON.stringify(data));
				this.authService.setCurrentUser(data)
				console.log("THis user: ", data);
				this.router.navigate(['/']);
			});
	}
}

