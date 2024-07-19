import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private _storage: Storage | null = null;

    constructor(
        private storage: Storage
    ){
        this.init()
    }

    async init() {        
        const storage = await this.storage.create();
        this._storage = storage;
    }

    set(key: string, value: any): boolean{
        // console.log("Log: setting data...")
        if(this._storage){
            this._storage?.set(key, JSON.stringify(value));
            return true;
        }
        return false;
    }

    async get(key: string){
        if(this._storage){
            const data =  await this._storage?.get(key);
            return data == null ? null : JSON.parse(data)
            // return this._storage?.get(key);
        }
        return null;
    }

    remove(key: string): boolean{
        if (this._storage) {
            this._storage.remove(key);
            return true;
        }
        return false;
    }

    clear(): boolean{
        if (this._storage) {
            this._storage.clear();
            return true;
        }
        return false;
    }

}  