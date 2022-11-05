import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {DietaCreatePage } from './dieta-create.page';

describe('DietaCreatePage', () => {
  let component:DietaCreatePage;
  let fixture: ComponentFixture<DietaCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DietaCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietaCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
