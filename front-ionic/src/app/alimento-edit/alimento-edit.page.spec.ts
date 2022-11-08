import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlimentoEditPage } from './alimento-edit.page

describe('AlimentoEditPage', () => {
  let component: AlimentoEditPage;
  let fixture: ComponentFixture<AlimentoEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentoEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlimentoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
