import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlimentoCreatePage } from './alimento-create.page';

describe('AlimentoCreatePage', () => {
  let component: AlimentoCreatePage;
  let fixture: ComponentFixture<AlimentoCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentoCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlimentoCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
