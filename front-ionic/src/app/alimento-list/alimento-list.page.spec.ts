import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlimentoListPage } from './alimento-list.page';

describe('AlimentoListPage', () => {
  let component: AlimentoListPage;
  let fixture: ComponentFixture<AlimentoListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentoListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlimentoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
