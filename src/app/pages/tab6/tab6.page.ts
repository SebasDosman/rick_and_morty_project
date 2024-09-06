import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  characterId! : number;
  character : any;

  constructor(private activatedRoute: ActivatedRoute, private charactersService: CharactersService) {  

    this.activatedRoute.params.subscribe(params => {

      this.characterId = params['id'];      

      this.loadCharacter();

    });
  }

  ngOnInit() {
  }

  async loadCharacter() {
    
    await this.charactersService
    .getCharactersById(this.characterId)
    .toPromise()
    .then((resp:any) => {
      this.character = resp;
    });
  }

}
