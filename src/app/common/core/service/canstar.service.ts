import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import * as Chance from 'chance';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CanstarService {

  constructor(
    private http: HttpClient,
  ) { }

  citites() {
    return this.http.get('assets/api/people.json').pipe(
      map((res: any[]) => {
        return res.map((e) => {
          return {
            city: e.address.city,
            id: e.id
          };
        })
      })
    )
  }

  get registeredCars() {
    return this.http.get('assets/api/registered-cars.json').pipe(
      map((res: any) => {
        return res.slice(0, 100)
      })
    );
  }

  //  O  L  D

  get sample() {
    return _.fill(Array(35), null).map((e: any) => e = this.doc);
  }

  private get doc() {
    const chance = new Chance();
    const image = 'https://material.angularjs.org/latest/img/washedout.png';
    const description = chance.sentence({ words: 105 });
    const creditScore = chance.integer({ min: 375, max: 844 });
    return {
      image, description, creditScore
    };
  }

  generate_suid() {

    const _uid = [];
    for (let i = 1; i < 10001; i++) {
      _uid.push( Chance().geohash({ length: 9 }) )
    }

    this.registerCars(_uid);
    this.createUserBookings(_uid);

  }

  registerCars(uid: string[]) {
    let registeredCars = []

    const _model = [ 'HND', 'TYT', 'MSB', 'SBR', 'FRD' ];
    const _brand = [ 'honda', 'toyota', 'mitsubishi', 'subaru', 'ford' ];
    const _status = [ 'available', 'unavailable', 'rented' ]
    const _no_seats = [ 2, 4, 6, 10 ];
    const _transmission = [ 'automatic', 'manual' ];

    for (let i = 0; i < 5000; i++) {
      registeredCars.push({
        uid: uid[i],
        id: this.randomInt(0, 4999),
        rating: this.randomInt(0, 5),
        geo: {
          latitude: Chance().latitude(),
          longitude: Chance().longitude()
        },
        discount: this.randomInt(0, 20),
        car_data: {
          model: `${_model[this.randomInt(0, 4)]}${this.randomInt(100, 999)}`,
          brand: _brand[this.randomInt(0, 4)],
          rent_per_day: this.randomInt(5, 2500),
          thumbnail: '',
          images: [],
          description: Chance().sentence({ words: 50 }),
          status: _status[this.randomInt(0, 2)],
          place_no: `${Chance().word({ length: 2 })}${this.randomInt(1000, 9999)}`,
          no_seats: _no_seats[this.randomInt(0, 3)],
          transmission: _transmission[this.randomInt(0, 1)]
        }
      })
    }

    registeredCars.forEach((e: any) => { e
      // this.canstar.registerCar('registered-cars', e);
    })

    console.log(registeredCars);
  }

  createUsers() {
    const users = [];

    this.http.get('assets/api/people.json').subscribe((response: any[]) => {

      response.forEach((e) => {
        if (e.id <= 4999) {
          users.push({
            id: e.id,
            username: e.email,
            password: e.lastName.toLowerCase(),
            rating: Chance().floating({ min: 1, max: 5, fixed: 1 }),
            financial: [
              { 0: this.randomInt(0, 10) },
              { 1: this.randomInt(10, 100) },
              { 2: this.randomInt(100, 1000) },
              { 3: this.randomInt(1000, 2500) }
            ]
          })
        }
      })

      users.forEach((e: any) => { e
        // this.canstar.registerCar('registered-users', e);
      })

      console.log(users);

    });

  }

  createUserBookings(uid: string[]) {

    const bookings = [];
    for (let i = 0; i < 5000; i++) {
      const _num_days_rented = this.randomInt(1, 30);
      const _rent_per_day = this.randomInt(5, 2500);
      bookings.push({
        id: i,
        books: [{
          reg_uid: uid[i],
          own_rating: Chance().floating({ min: 1, max: 5, fixed: 1 }),
          timestamp: this.unix,
          num_days_rented: _num_days_rented,
          rent_per_day: _rent_per_day,
          total_rent: _num_days_rented * _rent_per_day,
          modes_of_payment: 'cash'
        }]
      })
    }

    bookings.forEach((e: any) => { e
      // this.canstar.registerCar('user-bookings', e);
    })

    console.log(bookings);

  }

  get unix() {
    const _month = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    const date = new Date(`${_month[this.randomInt(0, 11)]}, ${this.randomInt(1, 25)}, ${this.randomInt(2017, 2018)}`);
    return moment(date).unix();
  }

  private randomInt(min: number, max: number) {
    return new Chance().integer({ min, max })
  }

}
