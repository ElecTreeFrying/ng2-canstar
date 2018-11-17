import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { map, startWith, switchMap } from 'rxjs/operators'
import * as _ from 'lodash';

import { CanstarService } from '../../../common/core/service/canstar.service';

import { CarModalComponent } from '../../../common/shared/component/car-modal/car-modal.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  isAdvanced: boolean = true;
  isLoading: boolean = true;
  carModel: string[] = [ 'Honda', 'Toyota', 'Mitsubishi', 'Subaru', 'Ford' ];
  no_seats: number[] = [ 2, 4, 6, 10 ];
  transmission: string[] = [ 'Automatic', 'Manual' ];
  cities = [];
  filterForm: FormGroup;
  filterObservable: Observable<any>;
  registerCars: Observable<any>;

  constructor(
    private canstar: CanstarService,
    private dialog: MatDialog,
    @Inject(FormBuilder) public fb: FormBuilder
  ) {
    this.filterForm = fb.group({
      'filter': [ '' ],
      // 'brand': [ '' ],
      // 'model': [ '' ],
      // 'no_seats': [ '' ],
      // 'transmission': [ '' ]
    })
  }

  ngOnInit() {
    this.canstar.citites().subscribe((res: any) => {
      this.cities = res;
    });

    setTimeout(() => {
      this.filterForm.setValue({'filter': ''});
      this.isLoading = false;
    }, 300);

    const value = this.filterForm.get('filter').value;
    this.filterObservable = this.filterForm.get('filter').valueChanges
      .pipe(
        startWith(value),
        map(a => this.displayFn(a)),
        map(b => this.filterPokemon(b))
      )

    const regCars = this.filterObservable;
    this.registerCars = this.canstar.registeredCars.pipe(
      switchMap((city: any) => {
        return regCars.pipe(
          map((regs: any) => {
            return this.inBoth(city, regs)
          })
        )
      })
    )
  }

  openCar(data: any) {
    this.dialog.open(CarModalComponent, {
      data
    })
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.name : value;
  }

  filterPokemon(value: string) {
    return value ? this._filter(this.cities, value) : this.cities;
  }

  trackByFn(index) {
    return index;
  }

  private _filter(pokemon: any[], value: string) {
    const filterValue = value.toLowerCase();
    return pokemon.filter(poke => poke.city.toLowerCase().includes(filterValue));
  }

  private operation(list1, list2, isUnion) {
    var result = [];
    for (var i = 0; i < list1.length; i++) {
      var item1 = list1[i], found = false;
      for (var j = 0; j < list2.length && !found; j++) { found = item1.id === list2[j].id; }
      if (found === !!isUnion) { result.push(item1); }
    }
    return result;
  }

  private inBoth(list1, list2) {
    let listA = this.operation(list1, list2, true);
    let listB = this.operation(list2, list1, true);

    listA = <any[]>_.sortBy(listA, [(a) => a.id]);
    listB = <any[]>_.sortBy(listB, [(a) => a.id]);
    return listA.map((a: any) => {
      a['city'] = listB.find(b => b.id === a.id).city
      return a;
    })
  }


}
