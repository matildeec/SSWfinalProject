import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Volume } from '../../volume';
import { ArchivioService } from '../../archivio.service';

@Component({
  selector: 'descrizione',
  standalone: true,
  templateUrl: './descrizione.component.html',
  styleUrls: ['./descrizione.component.css'],
  imports: [CommonModule]
})
export class DescrizioneComponent {
  @Input() indiceVolume: any = null;
  @Input() volumeTrovato: Volume = new Volume('', '', '', '');

  @Input() selezione: boolean = true;
  @Input() defaultSelection: boolean = true;
  @Output() cambioSelezione: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private archivio: ArchivioService) { }

  Clean(): void {
    this.selezione = false;
    this.defaultSelection = true;
    this.cambioSelezione.emit(this.selezione);
  }

  Rimuovi(): void {
    this.archivio.rimuoviLibro(this.volumeTrovato.autore, this.volumeTrovato.titolo, this.volumeTrovato.posizione);
    this.Clean();
  }

  Presta(nome: string): void {
    this.archivio.Inventario[this.indiceVolume].nominativo = nome;
    this.archivio.sendData(this.archivio.Inventario);
    this.Clean();
  }

  Restituisci(): void {
    this.archivio.Inventario[this.indiceVolume].nominativo = '';
    this.archivio.sendData(this.archivio.Inventario);
    this.Clean();
  }

}