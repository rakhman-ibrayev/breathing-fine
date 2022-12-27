import * as Accordion from '@radix-ui/react-accordion'
import './InfoAccordion.css'

const AccordionItem = ({ index, heading, description }) => {
    return (
        <Accordion.Item value={index} className="accordion-item">
            <Accordion.Header>
                <Accordion.Trigger className="accordion-item__trigger flex column">
                    <p className="accordion-item__index">.0{index}</p>
                    <h4 className="accordion-item__heading">{heading}</h4>
                    <div className="accordion-item__btn-trigger" aria-hidden="true">+</div>
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="accordion-item__content">
                {description}
            </Accordion.Content>
        </Accordion.Item>
    )
}

const InfoAccordion = ({ accordionContents }) => {
    if (!accordionContents) return null

    return (
        <Accordion.Root type="multiple">
            {accordionContents.map((content, index) =>
                <AccordionItem
                    key={`${content.heading}${index}`}
                    index={index + 1}
                    heading={content.heading}
                    description={content.description}
                />
            )}
        </Accordion.Root>
    )
}

export default InfoAccordion