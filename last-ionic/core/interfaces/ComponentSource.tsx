export interface ComponentSource {
    onLoad: (callback?: ()=> void) => void;
    methods: any;
}