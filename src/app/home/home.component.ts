import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Photo } from './model';
import { HomeService } from './service/home.service';

import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();

  public roverPhotos: Photo[] = [];
  public backupPhotos: Photo[] = [];
  public isDataLoading: boolean = false;
  public selectedDate: any;
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.isDataPresentLocally();
  }

  private isDataPresentLocally(){
    if(localStorage.getItem("photoData") != null){
      const photos = localStorage.getItem("photoData");
      this.roverPhotos = photos !== null ? JSON.parse(photos): [];
      this.backupPhotos = photos !== null ? JSON.parse(photos): [];
    }else {
      this.getRoversImagesBySol(1000);
    }
  }

  private saveDataLocally(){
    localStorage.setItem("photoData", JSON.stringify(this.roverPhotos))
  }

  private deleteDataLocally(){
    localStorage.removeItem("photoData");
  }

  private getRoversImagesBySol(sol: number): void {
    this.isDataLoading = true;
    this.homeService.getMarsRoverPhotosBySol(sol).subscribe(
      (res) => {
        console.log(res);
        this.roverPhotos = res['photos'];
        this.backupPhotos = res['photos'];
        this.saveDataLocally();
        this.isDataLoading = false;
      },
      (err) => {
        this.isDataLoading = false;
      }
    );
  }

  public likePost(index: number){
    this.roverPhotos[index].liked = true;
    this.saveDataLocally();
  }

  public unlikePost(index: number){
    this.roverPhotos[index].liked = false;
    this.saveDataLocally();
  }

  public refreshData() {
    this.deleteDataLocally();
    this.isDataPresentLocally();
    this.selectedDate = null;
  }

  public onChangingDate(e: any){
    console.log(e.value);
    this.isDataLoading = true;
    this.roverPhotos = this.backupPhotos;
    console.log(this.roverPhotos.length);
    this.roverPhotos = this.roverPhotos.filter((item) => {
      var earth_date = moment(item.earth_date, 'YYYY-MM-DD');
      var selectedDate = moment(e.value);
      return earth_date >= selectedDate;
    });
    console.log(this.roverPhotos.length);

    this.isDataLoading = false;
  }

}
