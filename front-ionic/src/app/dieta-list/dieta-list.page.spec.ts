import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietaListPage } from './dieta-list.page';

describe('DietaListPage', () => {
  let component: DietaListPage;
  let fixture: ComponentFixture<DietaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
