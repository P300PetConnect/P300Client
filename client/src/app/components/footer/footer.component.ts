import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private translate: TranslateService) { 
    if (localStorage.getItem('lang')) {
      translate.setDefaultLang(localStorage.getItem('lang'));
      translate.use(localStorage.getItem('lang'));
    } else {
      //default language
      translate.setDefaultLang('ie');
      translate.use('ie');
    }
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    localStorage.setItem('lang', language);
  }

  ngOnInit(): void {
  }

}
