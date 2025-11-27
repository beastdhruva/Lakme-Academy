
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Slide {
    id: number;
    title: string;
    video_url?: string;
    video_file?: string;
    image_url?: string;
    description: string;
    is_active: boolean;
    created_at: string;
}

@Injectable({
    providedIn: 'root'
})
export class SliderService {
    private apiUrl = 'http://localhost:3000/api/slides';

    constructor(private http: HttpClient) { }

    getAllSlides(): Observable<Slide[]> {
        return this.http.get<Slide[]>(this.apiUrl);
    }

    getActiveSlides(): Observable<Slide[]> {
        return this.http.get<Slide[]>(`${this.apiUrl}/active`);
    }

    getSlide(id: number): Observable<Slide> {
        return this.http.get<Slide>(`${this.apiUrl}/${id}`);
    }

    createSlide(formData: FormData): Observable<Slide> {
        return this.http.post<Slide>(this.apiUrl, formData);
    }

    updateSlide(id: number, formData: FormData): Observable<Slide> {
        return this.http.put<Slide>(`${this.apiUrl}/${id}`, formData);
    }

    toggleSlideStatus(id: number): Observable<Slide> {
        return this.http.patch<Slide>(`${this.apiUrl}/${id}/toggle`, {});
    }

    deleteSlide(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
