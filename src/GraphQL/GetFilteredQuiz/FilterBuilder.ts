import { Category } from "../generated/graphql";

interface IFilterBuilder {
  filterYear: (year: number) => void;
  filterCategory: (category: Category) => void;
}

class FilterConcreteBuilder implements IFilterBuilder {
  private query: String;
  private year: number;
  private category: Category;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.query = new String();
  }

  public filterYear = (year: number) => {
    this.year = year;
  };

  public filterCategory = (category: Category) => {
    this.category = category;
  };

  public getQuery = (): String => {
    return this.query;
  };
}

export {};
