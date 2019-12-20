# passOnEncapsulationDirective
Directive for Angular to pass on a parents encapsulation attribute to its children.

When `ViewEncapsulation.Emulated` is enabled in Angular (default), it adds an attribute to your HTML elements and CSS classes to keep your css rules inside the component. This is great if you only use your own components, since you can edit their respective styles directly. However, when you use other packages, f.e Angular Material, you don't have access to the component's children.

## Example before:

### my-component.ts

```html
<mat-form-field>
  <input matInput placeholder="placeholder" />
</mat-form-field>
```

### my-component.css
```css
.mat-form-field-infix {
    border: 1px solid red;
}
```

### Resulting HTML (simplified)
```html
<mat-form-field class="mat-form-field" _ngcontent-rwb-c0>
  <div class="mat-form-field-wrapper">
    <div class="mat-form-field-flex">
      <div class="mat-form-field-infix">
        <input class="mat-input-element"_ngcontent-rwb-c0/>
        <span class="mat-form-field-label-wrapper">
          <label class="mat-form-field-label">
            <span>placeholder</span>
          </label>
        </span>
      </div>
    </div>
    <div class="mat-form-field-underline">
      <span class="mat-form-field-ripple"></span>
    </div>
    <div class="mat-form-field-subscript-wrapper">
      <div class="mat-form-field-hint-wrapper">
        <div class="mat-form-field-hint-spacer"></div>
      </div>
    </div>
  </div>
</mat-form-field>
```
### Resulting CSS

```css
.mat-form-field-infix[_ngcontent-rwb-c0] {
    border: 1px solid red;
}
```
Angular uses randomly generated attributes, in this case `_ngcontent-rwb-c0`, to bind the CSS rules to the components HTML elements. But Angular only adds the attribute to the 'root' elements which are positioned directly in my template. In this case my css rule for `.mat-form-field-infix` will not be applied to the element. I will need to put it in the global `style.css` where no encapsulation tag is added to the CSS class. But this becomes tedious quickly, expecially when I want to display `.mat-form-field-infix` differently in several components; and it defeats the whole purpose of encapsulation.

## Example after:

### my-component.html
```html
<mat-form-field appPassOnEncap>
  <input matInput placeholder="placeholder"/>
</mat-form-field>
```

### Resulting HTML (simplified)
```html
<mat-form-field class="mat-form-field" _ngcontent-rwb-c0>
  <div class="mat-form-field-wrapper" _ngcontent-rwb-c0>
    <div class="mat-form-field-flex" _ngcontent-rwb-c0>
      <div class="mat-form-field-infix" _ngcontent-rwb-c0>
        <input class="mat-input-element" _ngcontent-rwb-c0/>
        <span class="mat-form-field-label-wrapper" _ngcontent-rwb-c0>
          <label class="mat-form-field-label" _ngcontent-rwb-c0>
            <span _ngcontent-rwb-c0>placeholder</span>
          </label>
        </span>
      </div>
    </div>
    <div class="mat-form-field-underline" _ngcontent-rwb-c0>
      <span class="mat-form-field-ripple" _ngcontent-rwb-c0></span>
    </div>
    <div class="mat-form-field-subscript-wrapper" _ngcontent-rwb-c0>
      <div class="mat-form-field-hint-wrapper" _ngcontent-rwb-c0>
        <div class="mat-form-field-hint-spacer" _ngcontent-rwb-c0></div>
      </div>
    </div>
  </div>
</mat-form-field>
```
By adding the `appPassOnEncap` attribute to my `mat-form-field` tag, I can add the elements `_ngcontent-...` encapsulation attribute to all of its children. Now my CSS rule for `.mat-form-field-infix` works.

## How to use (for beginners)
Generate a directive with the Angular CLI, to make sure that it's imported correctly in your app:
```bash
ng generate directive passOnEncapsulation
```

Then open `pass-on-encapsulation.directive.ts` of this repository and replace the code.