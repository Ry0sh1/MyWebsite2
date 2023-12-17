import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogDatabaseAppComponent } from './dog-database-app.component';

describe('DogDatabaseAppComponent', () => {
  let component: DogDatabaseAppComponent;
  let fixture: ComponentFixture<DogDatabaseAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogDatabaseAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogDatabaseAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
