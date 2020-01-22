import { Component, OnInit } from '@angular/core';
import { Tag } from "../tag";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.less']
})
export class TagsComponent implements OnInit {

  tag: Tag = {
    id: 0,
    name: "TestTag",
    weight: 1.0
  };

  constructor() { }

  ngOnInit() {
  }

}
