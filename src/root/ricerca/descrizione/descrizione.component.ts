import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArchivioService } from '../../archivio.service';

@Component({
  selector: 'descrizione',
  standalone: true,
  templateUrl: './descrizione.component.html',
  styleUrls: ['./descrizione.component.css'],
  imports: [CommonModule]
})
export class DescrizioneComponent implements OnInit {
  @Input() autore: string = '';
  @Input() titolo: string = '';
  @Input() posizione: string = '';
  @Input() nominativo: string = '';
  @Input() indiceVolume: any = null;

  @Input() selezione: boolean = true;
  @Input() defaultSelection: boolean = true;
  @Output() selezioneChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private archivio: ArchivioService) { }

  ngOnInit() {
  }

  clean(){
    this.selezione = false;
    this.defaultSelection = true;
    this.selezioneChanged.emit(this.selezione);
  }

  Remove(){
    this.archivio.rimuoviLibro(this.autore, this.titolo);
  
  }

  Presta(nome: string): void {
    this.archivio.Inventario[this.indiceVolume].nominativo = nome;
    this.archivio.sendData(this.archivio.Inventario);
    this.clean();
    console.log(this.selezione);
  }

  Restituisci(){
    this.archivio.Inventario[this.indiceVolume].nominativo = '';
    this.archivio.sendData(this.archivio.Inventario);
  }

}