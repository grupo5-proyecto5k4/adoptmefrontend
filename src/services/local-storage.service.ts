import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    setProfile(value: number) {
        let profile = JSON.stringify(value);
        localStorage.setItem("Profile", profile);
    }

    getProfile() {
        return JSON.parse(localStorage.getItem("Profile"));
    }
}