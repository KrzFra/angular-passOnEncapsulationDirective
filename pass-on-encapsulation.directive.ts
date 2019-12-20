import { AfterContentChecked, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appPassOnEncap]',
})
export class PassOnEncapsulationDirective implements AfterContentChecked {
    constructor(private elementRef: ElementRef) {}

    ngAfterContentChecked() {
        const nativeElement = this.elementRef.nativeElement as HTMLElement;

        if (nativeElement.hasAttributes()) {
            const ngContentAttribute = this.extractNgContentAttribute(nativeElement);

            if (ngContentAttribute) {
                this.addNgContentAttributeTooAllChildren(nativeElement, ngContentAttribute);
            }
        }
    }

    private extractNgContentAttribute(nativeElement: HTMLElement): string | null {
        const attributes = nativeElement.attributes;

        for (let i = 0; i < attributes.length; i++) {
            const attributeName = attributes[i].name as string;

            if (attributeName.indexOf('_ngcontent') === 0) {
                return attributeName;
            }
        }
        return null;
    }

    private addNgContentAttributeTooAllChildren(nativeElement: HTMLElement, ngContentAttribute: string) {
        for (let i = 0; i < nativeElement.children.length; i++) {
            const child = nativeElement.children[i] as HTMLElement;
            child.setAttribute(ngContentAttribute, '');

            if (child.hasChildNodes()) {
                this.addNgContentAttributeTooAllChildren(child, ngContentAttribute);
            }
        }
    }
}
