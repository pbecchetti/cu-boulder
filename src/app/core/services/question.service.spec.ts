import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;

  const newQuestion = {
    text: 'test question',
    username: 'userTest',
    timestamp: Date.now(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`'addQuestion' function should be functional`, fakeAsync(() => {
    service.addQuestion(newQuestion).subscribe({
      next: (res) => {
        expect(Object.values(res).length).toEqual(1);
      },
    });

    flush();
  }));
});
