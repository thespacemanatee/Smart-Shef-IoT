export default class Recipe {
  private name: string;

  private description: string;

  private imageUrl: string;

  constructor(name: string, description: string, imageUrl: string) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }
}
