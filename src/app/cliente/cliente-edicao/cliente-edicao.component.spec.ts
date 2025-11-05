import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteEdicaoComponent } from './cliente-edicao.component';

describe('ClienteEdicaoComponent', () => {
  let component: ClienteEdicaoComponent;
  let fixture: ComponentFixture<ClienteEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteEdicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
