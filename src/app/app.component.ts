import { Component, OnInit } from '@angular/core';
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  countries: string[] = []; 
  filteredCountries: string[] = []; 
  searchTerm: string = ''; 
  selectedCountry: string | null = null;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data.map((country: any) => country.name.common);
      },
      error: (err) => console.error('Error fetching countries:', err),
    });
  }

  onSearchTermChange(): void {
 
    this.selectedCountry = null;

   
    this.filteredCountries = this.countries.filter(country =>
      country.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectCountry(country: string): void {
    this.searchTerm = country; 
    this.filteredCountries = []; 
    this.selectedCountry = country; 
  }
}
