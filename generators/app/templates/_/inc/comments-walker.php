<?php

class <%= theme_slug %>_Comments_Walker extends Walker_Comment {
    // init classwide variables
    var $tree_type = 'comment';
    var $db_fields = array( 'parent' => 'comment_parent', 'id' => 'comment_ID' );
    /** CONSTRUCTOR
     * You'll have to use this if you plan to get to the top of the comments list, as
     * start_lvl() only goes as high as 1 deep nested comments */
    function __construct() {
        ?><section class="comments-section">
            <ol class="media-list comments-list"><?php
    }
    function start_lvl( &$output, $depth = 0, $args = array() ) {
        $this->current_comment_depth = $depth + 1;
        $this->setGlobals( $depth + 1 );
        echo '<!-- start level --> ';
        ?><ol class="media-list"><?php
    }
    /** END_LVL
     * Ends the children list of after the elements are added. */
    function end_lvl( &$output, $depth = 0, $args = array() ) {
        $this->current_comment_depth = $depth + 1;
        $this->setGlobals( $depth + 1 );
        ?></ol><?php
        echo '<!-- end level --> ';
    }
    private $current_comment_depth;
    private $current_comment;
    /** START_EL */
    private function setGlobals( $depth=null, $currentComment=null ) {
        global $comment_depth, $comment;
        if ($depth) $comment_depth = $depth;
        if ($currentComment) $comment = $currentComment;
    }
    function start_el( &$output, $comment, $depth = 0, $args = 0, $id = 0 ) {
        $this->setGlobals( $depth, $comment );
        $depth++;
        $this->current_comment_depth = $depth;
        $this->current_comment = $comment;
        $parent_class = ( empty( $args['has_children'] ) ? '' : 'parent' ); ?>

        <li <?php comment_class( array('media', $parent_class) ); ?> id="comment-<?php comment_ID() ?>">
            <a class="pull-left comment-author vcard" href="#">
                <!--img class="media-object" src="..." alt="..."-->
                <figure class="media-object">
                    <?php echo ( $args['avatar_size'] != 0 ? get_avatar( $comment, $args['avatar_size'] ) :'' ); ?>
                </figure>
            </a>
            <div class="media-body">
                <h4 class="media-heading author-name"><?php echo get_comment_author_link(); ?></h4>
                <div id="comment-content-<?php comment_ID(); ?>" class="comment-content">
                    <?php if( !$comment->comment_approved ) : ?>
                        <em class="comment-awaiting-moderation">Your comment is awaiting moderation.</em>

                    <?php else: comment_text(); ?>
                    <?php endif; ?>
                </div><!-- /.comment-content -->
                <div class="comment-meta comment-meta-data">
                    <a href="<?php echo htmlspecialchars( get_comment_link( get_comment_ID() ) ) ?>"><?php comment_date(); ?> at <?php comment_time(); ?></a> <?php edit_comment_link( '(Edit)' ); ?>
                </div><!-- /.comment-meta -->
                <div class="reply">
                    <?php $reply_args = array(
                        'add_below' => $args['add_below'],
                        'depth' => $depth,
                        'max_depth' => $args['max_depth'] );
                    comment_reply_link( array_merge( $args, $reply_args ) );  ?>
                </div><!-- /.reply -->


    <?php }
    function end_el(&$output, $comment, $depth = 0, $args = array() ) { ?>

            </div> <!-- .media-body -->
        </li>
        <?php echo '<!-- /#comment-' . get_comment_ID() . ' -->'; ?>

    <?php }
    function __destruct() {
        ?></ol></section><?php
    }
}
