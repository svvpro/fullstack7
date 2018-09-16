import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) {
  }

  getAllPositions(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/positions/${categoryId}`);
  }

  addPosition(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/positions', position);
  }

  updatePosition(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/positions/${position._id}`, position);
  }

  deletePosition(position: Position): Observable<Message> {
    return this.http.delete<Message>(`/api/positions/${position._id}`);
  }
}
