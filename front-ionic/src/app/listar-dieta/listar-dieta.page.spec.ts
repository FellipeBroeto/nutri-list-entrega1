import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListarDietaPage } from './listar-dieta.page';

describe('ListarDietaPage', () => {
  let component: ListarDietaPage;
  let fixture: ComponentFixture<ListarDietaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarDietaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarDietaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
