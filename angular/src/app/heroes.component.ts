import {Component, OnInit} from "@angular/core";
import {Hero} from "./hero";
import {HeroService} from "./hero.service";
import {Router} from "@angular/router";
import {HeroDetailComponent} from "./hero-detail.component";

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes:Hero[];
  selectedHero:Hero;
  error:any;
  addingHero:boolean;

  constructor(private router:Router,
              private heroService:HeroService) {
  }

  onSelect(hero:Hero) {
    this.selectedHero = hero;
  }

  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero:Hero) {
    this.addingHero = false;
    if (savedHero) {
      this.getHeroes();
    }
  }

  deleteHero(hero:Hero, event:any) {
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      })
      .catch(error => this.error = error);
  }
}
