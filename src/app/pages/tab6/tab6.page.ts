import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  characterId!: number;
  character!: Character;

  constructor(private activatedRoute: ActivatedRoute, private charactersService: CharactersService) {
    this.activatedRoute.params.subscribe(params => {
      this.characterId = params['id'];
      this.loadCharacter();
    });
  }

  ngOnInit() {
  }

  loadCharacter() {
    this.charactersService.getCharacterById(this.characterId).subscribe(response => {
      this.character = response;
    });
  }
}
