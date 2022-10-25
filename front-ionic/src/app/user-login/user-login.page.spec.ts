import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserLoginCreatePage } from './user-login.page';

describe('UserLoginCreatePage', () => {
  let component: UserLoginCreatePage;
  let fixture: ComponentFixture<UserLoginCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoginCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
