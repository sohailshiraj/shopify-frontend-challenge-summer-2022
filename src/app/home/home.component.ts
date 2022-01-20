import { Component, OnInit } from '@angular/core';
import { Photo } from './model';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public roverPhotos: Photo[] = [];
  public isDataLoading: boolean = false;
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.isDataLoading = true;
    //this.getRoversImagesBySol(1000)
  }

  public getRoversImagesBySol(sol: number): void {
    this.isDataLoading = true;
    this.homeService.getMarsRoverPhotosBySol(sol).subscribe(
      (res) => {
        console.log(res);
        this.roverPhotos = res['photos'];
        this.isDataLoading = false;
      },
      (err) => {
        this.isDataLoading = false;
      }
    );
  }

  public likePost(index: number){
    this.roverPhotos[index].liked = true;
  }

  public unlikePost(index: number){
    this.roverPhotos[index].liked = false;
  }

}
