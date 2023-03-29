import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  currentCategory: Category | null;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result.data
    })
  }

  setCurrentCategory(category: Category | null) {
    this.currentCategory = category;
  }

  getCurrentCategoryClass(category: Category) {
    if (this.currentCategory == category) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  getAllCategories() {
    if (!this.currentCategory) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }
}
