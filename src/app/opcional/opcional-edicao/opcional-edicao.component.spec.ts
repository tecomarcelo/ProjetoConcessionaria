import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionalEdicaoComponent } from './opcional-edicao.component';

describe('OpcionalEdicaoComponent', () => {
  let component: OpcionalEdicaoComponent;
  let fixture: ComponentFixture<OpcionalEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionalEdicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionalEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
