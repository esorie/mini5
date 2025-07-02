package ktaivleminitocode.infra;

import ktaivleminitocode.domain.*;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import org.springframework.stereotype.Component;

@Component
public class PublicationHateoasProcessor
    implements RepresentationModelProcessor<EntityModel<Publication>> {

    @Override
    public EntityModel<Publication> process(
        EntityModel<Publication> model
    ) {
        return model;
    }
}
