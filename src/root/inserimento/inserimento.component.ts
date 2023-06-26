import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArchivioService } from '../archivio.service';
import { RootComponent } from '../root.component';

@Component({
  selector: 'inserimento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css']
})
export class InserimentoComponent /*implements OnInit*/ {
  @Input() selezione: boolean = true;
  @Output() selezioneChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private router: Router, private archivio: ArchivioService) { }

  navigaVersoPagina(page: string): void {
    this.router.navigate([page]);
  }

  Insert(autore: string, titolo: string): void {
    //Passa i valori delle var autoreValue, titoloValue, posizioneValue
    this.archivio.aggiungiLibro(autore, titolo);
  }

  clean(){
    this.selezione = false;
    this.selezioneChanged.emit(this.selezione);
  }

}