export class Photo {
    camera!: Camera;
    earth_date!: string;
    id!: number;
    img_src!: string;
    sol!: number;
    rover!: Rover;
    liked?: boolean;
}

export class Camera {
    id!: number;
    full_name!: string;
    name!: string;
    rover_id!: number;
}

export class Rover {
    id!: number;
    landing_date!: string;
    launch_date!: string;
    name!: string;
    status!: string;
}