import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GithubRepo } from '../interfaces/GithubRepo';
import { GithubUser } from '../interfaces/GithubUser';


@Injectable({
  providedIn: 'root'
})


export class GithubApiService {

  private readonly baseURL: string = 'https://api.github.com/users/'
  // HttpClient == objt responsavel por fazer requisições http no angular
  constructor(private http: HttpClient) { }


  /* Métodos Http
  Leitura de dados -> GET
  Criação de dados -> POST
  Atualização de dados -> PUT
  Deleção de dados -> DELETE 
  */
  procurarUsuario(username: string) {
    return this.http.get<GithubUser>(`${this.baseURL}${username}`) /* contatenando para pegar o nome do usuario  */
   }
  procurarRepos(username: string){
    return this.http.get<GithubRepo[]>(`${this.baseURL}${username}/repos}`)
  }
}
