import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GithubRepo } from './interfaces/GithubRepo';
import { GithubUser } from './interfaces/GithubUser';
import { GithubApiService } from './services/github-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  githubForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]]
  })

  gUser!: GithubUser
  gRepo: GithubRepo[] = []

  constructor(
    private fb: FormBuilder,
    private githubService: GithubApiService,
    private snackBar: MatSnackBar
  ) { }

  procurar() {
    //recuperando o nome de usuario que deve ser procurado
    const username = this.githubForm.get('username')?.value
    this.githubService.procurarUsuario(username).subscribe(
      (user) => {
        console.log(user)
        this.gUser = user
      },
      (erro) => {
        //preciso saber se o meu erro vem desta classe (HttpErrorResponse)
        if (erro instanceof HttpErrorResponse) {
          if(erro.status == 404){
            this.snackBar.open("O usuario: "+username+" nao foi encontrado ","OK")
          }
        }
      }
    )

    this.githubService.procurarRepos(username).subscribe(
      (repos) => {
        console.log(repos)
        this.gRepo = repos

      })
  }
}
